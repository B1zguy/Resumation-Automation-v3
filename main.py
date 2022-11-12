from bs4 import BeautifulSoup
import requests, csv, subprocess, os, json
from pprint import pprint
from typing import List
import click

''' Existing to generate random words for testing more keyword placeholders
# EG: jobs_List_Extracted.extend([[random_string(5), random_string(3), jobTitle.get_text().strip(), jobCo.getText().strip()]])
import string
import random
def random_string(length):
    return ''.join(random.choice(string.ascii_letters) for m in range(length))
    '''


Dir_Path = os.path.dirname(os.path.realpath(__file__))  # Using this method instead of os.getcwd() cos it follows symlinks
Jobs_CSV: str = 'jobs.csv'  # URLs pasted from Seek
Jobs_File: str = Dir_Path + '/' + Jobs_CSV # Building absolute path for ExtendScript
Resume_Exports: str = Dir_Path + '/' + 'Resumes'
Jobs_CSV_Extracted: str = 'jobs-extracted.csv'

# Opens CSV w/ job URLs
# Scrapes each URL to gather Job Title & Company
# Chucks results into existing nested array
# Writes new array to extracted CSV
def scraping(jobsFile: str) -> None:
    jobs_List_Extracted: List[List[str]] = []
    # Hold csv as nested list
    with open(jobsFile) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        jobsList = list(csv_reader)

    #  Iterate through jobList's URLs
    #  Choose CSS Selector
    jobTitle_Source = '._1cshjhyp'
    jobCo_Source = '._1cshjhyd'

    for url in jobsList:
        page = requests.get(url[0])
        soup = BeautifulSoup(page.text, 'html.parser')

        jobTitle = soup.select_one(jobTitle_Source)
        jobCo = soup.select_one(jobCo_Source)
            # Quick Note: slashes in extracted text are kept when extracting
        jobs_List_Extracted.extend([[jobTitle.get_text().strip(), jobCo.getText().strip()]]) #  Needs to be double-bracket to make list of lists

    #  Write to jobs-extracted.csv
    #  Will always overwrite file
    with open(Jobs_CSV_Extracted, 'w') as csv_file_W:
        csv_writer = csv.writer(csv_file_W)
        csv_writer.writerows(jobs_List_Extracted)

    return

#  The part that glues AppleScript, ExtendScript (.jsx) and InDesign all together
#    to export a rendered resume
#  Depends on 'scraping' function
def executeScript(exportdir: str, csvdir: str):
    #  AppleScript simple enough to directly include (think only got it working this way too)
    #  Keeping directories outside as variables for cleaner reading
    software: str = "/Applications/Adobe InDesign 2022/Adobe InDesign 2022.app"
    script: str = os.path.abspath('cover-letters-generator.jsx')  # AppleScript needs absolute paths
    # Must have quotes surrounding placeholders cos script needs them. Better than dealing w/ escaping

    #  Arguments for AppleScript. Gets piped into the upcoming shell command
    #  Current Directory & jobs-extracted.csv
    argsy: List = [exportdir, csvdir]  # Hard code for now. Can make dynamic when wanting to expand size
    argsy = json.dumps(argsy)   #  json.dumps [vs str(argsy)] returns string encapsulated as single quotes, rather than double.
                                #  Don't know if important tbh, yet keeping for now incase it breaks the Apple/ExtendScript components...

    #  Raw AppleScript code to be run via osascript in a spawned shell, below
    #  Could only manage to get arguments to pass/escape this way (into AppleScript then ExtendScript) for
    #    some reason. Wrote this portion a long time and don't want to break so leaving it...
    cmd = """
            tell application "{0}"
                activate
                do script "{1}" language javascript with arguments {2}
            end tell
            """
    a = cmd.format(software, script, argsy)
    pprint(a)
    # Remember command will need to be different if deciding to include .jsx file in the future (comment from old file)
    #  .format is a normal Python method and cmd is the variable! Am building the completed command
    result = subprocess.run(['osascript', '-e', cmd.format(software, script, argsy)], capture_output=True, text=True)

    return result.stdout, result.stderr  # Wanna see AppleScript console incase there are errors


# pprint(scraping(jobsFile=Jobs_File))
scraping(jobsFile=Jobs_File)
pprint(executeScript(exportdir=Resume_Exports, csvdir=Jobs_CSV_Extracted))
# executeScript(exportdir=Resume_Exports, csvdir=Jobs_CSV_Extracted)




# TODO: Add remainder type hinting when all is working
# TODO: Review casing convention
# TODO: Mark comments from old file.

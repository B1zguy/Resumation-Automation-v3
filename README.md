Automatically generates cover letters by pulling data from Seek job listings. Seek URLs are fed into the program then the resumes are generated with InDesign exporting as PDFs. 

The program can logically be seen as three scripts working together - all orchestrated within main.py.
* Data fetching from Seek is done within main.py
* AppleScript is used to run the automation for InDesign
* The instructions for automation is written in ExtendScript

The comments in the code explains some of the seemingly non-intuitive design of this program. TLDR; ExtendScript is a language written by Adobe to automate Adobe software, however it's based on ECMAscript 3 and not well documented. AppleScript is used to call and manage the ExtendScript whilst feeding in the arguments. Everything is wrapped in Python so one can run with one click.

<br>

This third version builds upon its forefathers by:

&emsp; &ndash; &nbsp; Adding type hints

&emsp; &ndash; &nbsp; Cleaning legacy code, notes and comments

&emsp; &ndash; &nbsp; Updating support for InDesign '22

&emsp; &ndash; &nbsp; Updating support for Seek's ever-changing website

&emsp; &ndash; &nbsp; Build in possibility to include more placeholders in the future

&emsp; &ndash; &nbsp; Interactive CLI

<br>

Debugging ExtendScript in 2022 requires the ExtendScript Debugger in vsCode. Adobe created this to replace their no longer functioning ExtendScript Toolkit.

<br>

------


This is a CLI wrapped in the Poetry dependency management and packaging system.

Re Poetry:
I think I've realised I never needed it for this project yet just going to leave it in for now. Couldn't get 'poetry run resumation' to work but program will run with _poetry run python main.py_.

### Preparation
&emsp; &ndash; &nbsp; Open `resume-test.indd` in InDesign. Doublecheck the placeholders 'OPENING' and 'COMPANY' are written. Be mindful that the ExtendScript script will attempt to automate any open document.

&emsp; &ndash; &nbsp; Paste Seek URLs in `jobs.csv`. One each line.

### To run

_main.py_ can take two arguments or be left empty. Thus, two ways to run this CLI program.

Either run _main.py_ with Poetry:

&emsp; &emsp; `poetry run python main.py`

<p align="center"> Or </p> 

&emsp; &emsp; `poetry shell` to activate virtualenv then run <br>
&emsp; &emsp; `python main.py`

<br>

  


#### &emsp; &emsp; To automatically run at once

&emsp; &emsp;  Run `main.py` without arguments. 

&emsp; &emsp; This is the handsoff approach. It will fetch the data, fill in the placeholders and export the cover letters.

<br>

#### &emsp; &emsp; To edit '_job title_' & '_company_' prior to exporting

&emsp; &emsp;  1. &nbsp; Run `main.py jobs`.

&emsp; &emsp;  2. &nbsp; Edit fetched data in `jobs-extracted.csv`

&emsp; &emsp;  3. &nbsp; Run `main.py export` to generate the PDFs.  
&emsp; &emsp; &emsp; &emsp; &emsp; This step will not fetch new data!



Cover Letters can be found the _Resumes_ folder (which must pre-exist).
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

<br>

Debugging ExtendScript in 2022 requires the ExtendScript Debugger in vsCode. Adobe created this to replace their no longer functioning ExtendScript Toolkit.
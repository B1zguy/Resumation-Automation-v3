var openDoc = app.activeDocument;

var myPDFExportPreset = app.pdfExportPresets.item("[High Quality Print]");
app.pdfExportPreferences.pageRange = "1";
// var dir = "/Volumes/GoogleDrive/My Drive/_Life/Work/Resumes/Resume 9.x/Resume 9.1/Resume Automation VScode/Auto-Resumes/"
var dir = arguments[0]
// alert (dir,["Resume Script", false])

function extractJobList(jobsFile){
    // alert ("In Function",["Resume Script", false])
    // Note some things need to change for Windows!
    var file = File(File($.fileName).parent.fsName + '/jobs-extracted.csv');
    //var file = File(jobsFile)
    file.encoding = 'UTF8';
    file.lineFeed = 'Macintosh'; // Change for Windows!
    file.open('r', undefined, undefined); // Opens file
    var content = file.read();
    file.close();
    ////alert (content + ["Resume Script", false]) //
    //var lines = content.split('\n') // Windows should be '\r'

    //!alert (content + '\n' + 'content' + '\n' + typeof content + '\n' + content.length)
    var lines = content.replace(/\r/g, "").split(/\n/);
    //!alert (lines + '\n' + 'lines' + '\n' + typeof lines + '\n' + lines.length)
    ////alert (lines + ' <<<',["Resume Script", false])
    ////alert (lines.length + ' <<<',["Resume Script", false])
    //var lines = lines.slice(1)
    // $.writeln(lines.stringify)
    var jobs = []
    for (var i=0; i < lines.length; i++) {
        $.writeln(lines[i].length)
        $.writeln(lines[i])
        //!alert (lines[i] + '\n' + 'lines[i]' + '\n' + typeof lines[i])
        // var a = lines[i].split(',').slice(1) // Unsure what slice is for...
        var a = lines[i].split(',')
        //!alert (a + '\n' + 'a' + '\n' + typeof a)
        $.writeln(a)
        //$.writeln(a[0])
        //jobs.push.apply([lines.i[0], lines.i[1]])
        //jobs.push.apply(jobs, a)
        // jobs.push.apply(jobs, [a])
        jobs.push(a)
    }
    //$.writeln(jobs.alert())\
    //$.writeln(jobs[0].length)

    // alert (jobs + '\n' + 'jobs' + '\n' + typeof jobs + '\n' + jobs.length)
    return jobs;
}
var jobList = extractJobList(arguments[1]);
$.writeln(jobList.length);

placeholder = ["OPENING", "COMPANY"]

// alert (arguments[1] + 'arguements[1]')
for (var i=0; i < jobList.length; i++) {
    // Hardcoding changes for now, unlikely 
    // to need more than OPENING & COMPANY

    // alert (jobList + '\n' + 'joblist complete' + '\n' + typeof jobList + '\n' + i)
    // alert (arguments[1] + '\n' + 'arguments[1]' + '\n' + typeof arguments[1] + '\n \n' + jobList + '\n' + 'joblist complete' + '\n' + typeof jobList + '\n' + i)
    ///alert (jobList + '\n' + 'joblist' + '\n' + typeof jobList + '\n' + jobList.length)
    ///alert (jobList[i] + '\n' + 'joblist[i]' + '\n' + typeof jobList[i])

    for (var j=0; j < jobList[i].length; j++) {
        // $.writeln(jobList[i][j])
        $.writeln(placeholder[j])
        $.write(placeholder[j])
        // Mac alert dialogues do not show title so snipped off ", ["PLACEHOLDER", false]" in eg" (placeholder[j]+' '+ j, ["PLACEHOLDER", false]) 
         
        ///alert (placeholder[j] + '\n' + 'placeholder' + '\n' +  typeof placeholder[j]) 
        // alert (placeholder[j]+' '+ j, ["PLACEHOLDER", false]) 
        // alert (jobList[i]+' '+ i, ["JOBLIST IIIII", false])
        // alert (jobList[i][j]+' '+ i+'/' +' '+j, ["JOBLIST", false])
        // alert (placeholder[j].length+' '+ 'p length', ["sdfsdfsdf", false]) 
        // alert (jobList[i].length+' '+ 'j length', ["JOBLIST IIIII", false])
        app.findTextPreferences = NothingEnum.nothing; // I think this clears the variables or something inside InDesign...
        app.changeTextPreferences = NothingEnum.nothing;

        app.findTextPreferences.findWhat = placeholder[j];
        app.changeTextPreferences.changeTo = jobList[i][j];

        openDoc.changeText();
    }
    var pathy = "Nathan - " + jobList[i][1] + " - Cover Letter.pdf"  // Hardcode val for now
    var dirPathy = dir+ '/' + pathy
    // alert (jobList[i][1],["Resume Script", false])
    app.activeDocument.exportFile(ExportFormat.pdfType, File(dirPathy), false, myPDFExportPreset);

    // I think this reverts the placeholders back...
    for (var j=0; j < jobList[i].length; j++) {
        $.writeln(jobList[i][j])
        ///alert (placeholder[j] + '\n' + 'placeholder' + '\n' + typeof placeholder[j] + '\n' + 'REVERT') 
        // $.writeln(placeholder[j])
        app.findTextPreferences = NothingEnum.nothing;
        app.changeTextPreferences = NothingEnum.nothing;
            // the reverting?
        app.findTextPreferences.findWhat = jobList[i][j];
        app.changeTextPreferences.changeTo = placeholder[j];

        openDoc.changeText();
    }
}

$.writeln('done')
// alert ("All Done!",["Resume Script", false])
const sha1 = require("sha-1");

function sha1FileTree(root){
    let rootStr
    if(root.sha1){
        return;
    }
    if(root.type === "Folder"){
        rootStr = root.fileContent.reduce((accumulator, currFile)=>{
            sha1FileTree(currFile);
            return accumulator + `${currFile.name}-${currFile.sha1}-${currFile.type}-${currFile.lastTouchDate}\n`;
        }, "");
    }
    else{
        rootStr = root.fileContent;
    }
    root.sha1 = sha1(rootStr);
    console.log("after sha1", root);
}


function sha1Commit(commit){
    sha1FileTree(commit.rootFolder);    
    const commitStr = `${commit.title}-${commit.message}-${commit.prevCommits}-${commit.rootFolder.sha1}`
    commit.sha1 = sha1(commitStr);
}

function createRepository(id,name, creator, description, branches, currBranch){
    return {
        id : id,
        name : name,
        creator: creator,
        description : description, 
        branches : branches,
        currBranch : currBranch,
    }
}

function createCommit(id, title, message, prevCommits, rootFolder,creationDate){

    return {
        id: id, 
        title : title,
        message: message,
        prevCommits : prevCommits,
        rootFolder : rootFolder,
        creationDate : creationDate, 
    }
}

function createFile(id, name, type, fileContent, lastTouchDate){
    return {
        id:id,
        name: name,
        type: type,
        fileContent: fileContent,
        lastTouchDate : lastTouchDate
    }
}

function compareFiles(a,b){
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    
}


const testFile1 = createFile("600", "test.txt", "File", "I am a great test",new Date(Date.now()).toISOString());
const testFile2 = createFile("700", "Hello world.txt", "File", "Hello World!", new Date(Date.now()).toISOString());
const testFile3 = createFile("800", "NormalFile.txt", "File", "Bla Bla", new Date(Date.now()).toISOString());
const testFile4 = createFile("900", "test.txt", "File", "i am the updated test.txt", new Date(Date.now()).toISOString());
const commitInnerFolder = createFile("400", "innerFolder", "Folder",[testFile2], new Date(Date.now()).toISOString())

const commitRootFolder1 = createFile("500", "my-first-repo", "Folder", [testFile1, commitInnerFolder].sort(compareFiles),new Date(Date.now()).toISOString());
const initialCommit = createCommit("300", "Initial Commit", "The First and Best commit",[] ,commitRootFolder1, new Date(Date.now()).toISOString());
const branchesMap = new Map();
sha1Commit(initialCommit)
branchesMap.set("main", initialCommit);
// commitInnerFolder.fileContent = [testFile2];
const commitRootFolder2 = createFile("500", "my-first-repo", "Folder", [testFile4, commitInnerFolder, testFile3].sort(compareFiles),new Date(Date.now()).toISOString());
const nextCommit = createCommit("350", "Second Commit", "The better and Bester commit", [initialCommit], commitRootFolder2, new Date(Date.now()).toISOString());
sha1Commit(nextCommit);
branchesMap.set("test branch", nextCommit);
// console.log(objectsMap);

const repository = createRepository("100", "my-first-repo", "MatanP12", 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas volutpat." +
"Ac odio tempor orci dapibus ultrices in iaculis nunc.", branchesMap, "main");


const repositories = [repository];

console.log("Test repository:", repository)

export default repositories;
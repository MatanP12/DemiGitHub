const sha1 = require("sha-1");

function sha1FileTree(root, map){
    let sha1Root;
    if(map.has(root)){
        return root;
    }
    if(root.type === "Folder"){
        root.fileContent = root.fileContent.map((currFile)=>{
            return sha1FileTree(currFile, map);
        })
        
        
        const rootStr = root.fileContent.reduce((accumulator, currFileSha1)=>{
            const currFile = map.get(currFileSha1);
            return accumulator + `${currFile.name}-${currFileSha1}-${currFile.type}-${currFile.lastTouchDate}\n`;
        }, "");
        sha1Root = sha1(rootStr);
    }
    else{
        sha1Root = sha1(root.fileContent);
    }
    map.set(sha1Root, root);
    return sha1Root;

}


function sha1Commit(commit, map){
    commit.rootFolder = sha1FileTree(commit.rootFolder, map);    
    const commitStr = `${commit.title}-${commit.message}-${commit.prevCommits}-${commit.rootFolder}`
    const sha1Str = sha1(commitStr);
    map.set(sha1Str, commit);
    return sha1Str;
}

function createRepository(id,name, creator, description, branches, currBranch, objectsMap){
    return {
        id : id,
        name : name,
        creator: creator,
        description : description, 
        branches : branches,
        currBranch : currBranch,
        objectsMap : objectsMap
    }
}

function createCommit(id, title, message, prevCommits, rootFolder,creationDate){

    return {
        id: id, 
        title : title,
        message: message,
        prevCommits : prevCommits,
        rootFolder : rootFolder,
        creationDate : creationDate
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

const objectsMap = new Map();

const testFile1 = createFile("600", "test.txt", "File", "I am a great test",new Date(Date.now()).toISOString());
const testFile2 = createFile("700", "Hello world.txt", "File", "Hello World!", new Date(Date.now()).toISOString());
const testFile3 = createFile("800", "NormalFile.txt", "File", "Bla Bla", new Date(Date.now()).toISOString());
const testFile4 = createFile("900", "test.txt", "File", "i am the updated test.txt", new Date(Date.now()).toISOString());
const commitInnerFolder = createFile("400", "innerFolder", "Folder",[testFile2], new Date(Date.now()).toISOString())

const commitRootFolder1 = createFile("500", "my-first-repo", "Folder", [testFile1, commitInnerFolder].sort(compareFiles),new Date(Date.now()).toISOString());
const initialCommit = createCommit("300", "Initial Commit", "The First and Best commit",[] ,commitRootFolder1, new Date(Date.now()).toISOString());
const branchesMap = new Map();
branchesMap.set("main", sha1Commit(initialCommit, objectsMap));
commitInnerFolder.fileContent = [testFile2];
const commitRootFolder2 = createFile("500", "my-first-repo", "Folder", [testFile4, commitInnerFolder, testFile3].sort(compareFiles),new Date(Date.now()).toISOString());
const nextCommit = createCommit("350", "Second Commit", "The better and Bester commit", [branchesMap.get("main")], commitRootFolder2, new Date(Date.now()).toISOString());
branchesMap.set("test branch", sha1Commit(nextCommit, objectsMap));
// console.log(objectsMap);

const repository = createRepository("100", "my-first-repo", "MatanP12", 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas volutpat." +
"Ac odio tempor orci dapibus ultrices in iaculis nunc.", branchesMap, "main", objectsMap)


const repositories = [repository];

// console.log(objectsMap)

export default repositories;
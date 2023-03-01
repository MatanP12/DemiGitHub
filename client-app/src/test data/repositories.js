const sha1 = require("sha-1");

function createRepository(id,name, creator, description, branches, mainBranch){
    return {
        id : id,
        name : name,
        creator: creator,
        description : description, 
        branches : branches,
        mainBranch : mainBranch,
    }
}

function createCommit(id, title, message, prevCommits,creationDate, rootFolder){
    return {
        id: id, 
        title : title,
        message: message,
        prevCommits : prevCommits,
        rootFolder : {...rootFolder},
        creationDate : creationDate, 
    }
}

function createFolder(id, name, lastTouchDate, fileContent){
    const currFolder = {
        id, name, lastTouchDate, type: "Folder"
    }

    const newFolderContent = fileContent.map((currObject)=>{
        currObject.parentFolder = currFolder;
        return [currObject.sha1, currObject];
    })

    
    const newSha1 = fileContent.reduce((accumulator, currObject)=>{
        return accumulator + `${currObject.name}-${currObject.sha1}-${currObject.lastTouchDate}`
    }, "")
    currFolder.sha1 = sha1(newSha1);
    currFolder.fileContent = new Map(newFolderContent);    
    return currFolder;
}

function createFile(id, name, lastTouchDate, fileContent){
    return {
        id, name, fileContent, sha1:sha1(fileContent+name), lastTouchDate, type: "File"
    }
}

const now = new Date().toISOString();

const repository = createRepository("1", "MyFirstRepo", "MatanP12", "The first and vest repos",
    new Map(), "main");

const initialCommit = createCommit("2", "initial commit", "The first commit", [], now,
    createFolder("3", "MyFirstRepo", now, [
        createFile("4", "test.txt", now, "The best testFile"),
        createFolder("5", "innerFolder", now, [
            createFile("6", "Hello World.txt", now, "Hello world!!")
        ] ),
    ])
)

const nextCommit = createCommit("7", "The better commit", "I am the best Commit", [initialCommit],now,
    createFolder("8", "MyFirstRepo", now, [
        createFile("9", "test.txt", now, "The Best and Better test"),
        createFolder("10", "innerFolder", now, [
            createFile("11", "Hello World.txt", now, "Hello world!!")
        
        ] ),
        createFile("12", "MatanP.js", now, "Hello Everybody!")

    ])
)

repository.branches.set("main", initialCommit);
repository.branches.set("test banch", nextCommit);

console.log(repository);

const repositories = [repository];
export default repositories;
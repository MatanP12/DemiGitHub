const repositories = [
    {
        id : 0,
        name: "my-first-repo",
        creator : "MatanP12",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas volutpat." +
         "Ac odio tempor orci dapibus ultrices in iaculis nunc.",
        branches: [
            {
                id : "100",
                name: "main",
                currentCommit : {

                    id: "200",
                    name : 'SOME_SHASH_THING',
                    commitTitle : "Initial Commit",
                    commitMessage: "This is the initial Commit",
                    rootFolder: {
                        id : "300",
                        name: "my-first-repo",
                        type: "Folder",
                        fileContent : [
                            {
                                type: "File",
                                id : "400",
                                name : "Shmulik.txt",
                                fileContent: "Hello world!"
                            },
                            {
                                id : "500",
                                type: "Folder",
                                name: "TestFolder",
                                fileContent : [
                                    {
                                        type: "File",
                                        id : "600",
                                        name : "main.js",
                                        fileContent: "console.log('Hello world')"
                                    }
                                ]
                            }
        
                        ]
        
                    }
                },
            },
            {
                id : "1000",
                name: "Bla Branch",
                currentCommit : {

                    id: "1500",
                    name : 'SOME_SHASH_THING',
                    commitTitle : "Initial Commit",
                    commitMessage: "This is the initial Commit",
                    rootFolder: {
                        id : "3000",
                        name: "my-first-repo",
                        type: "Folder",
                        fileContent : [
                            {
                                type: "File",
                                id : "4000",
                                name : "Shmulik.txt",
                                fileContent: "Hello world!"
                            },        
                        ]
        
                    }
                },
            },

        ]
    },
]


export default repositories;
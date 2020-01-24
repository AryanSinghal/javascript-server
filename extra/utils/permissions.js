let permissions={
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: [],
    },
    'myUsers':{
        all: ['hod'],
        read : ['student', 'teacher'],
        write : ['teacher'],
        delete: ['admin'],
    }
    };
console.log(hasPermission("getUsers","trainee","read"));
function hasPermission(moduleName,role,permissionType)   
{
    let data=permissions[moduleName];
    let tmp=false;
    if(data[permissionType]===undefined)
        return false;

    data[permissionType].forEach(element => {
        if(element==role)
        {
           tmp=true;
        } 
        
    });
    return tmp;



}
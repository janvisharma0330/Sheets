
function colorPromise()
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },1000)
    })
}
async function isCyclicTracePath(graphComponentMatrix ,cycleResponse)
{
    let [srcRow , srcCol]=cycleResponse;
    let visited=[];
    let dfsVisited=[];
    for(let i=0;i<rows;i++)
    {
        let visitedRow=[];
        let dfsVisitedRow=[];
        for(let j=0;j<col;j++)
        {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }
    // for(let i=0;i<rows;i++)
    // {
    //     for(let j=0;j<col;j++)
    //     {
    //         if(visited[i][j]===true) continue;
    //         else
    //         {
    //             let response=dfsCycleDetection(graphComponentMatrix , i ,j ,visited , dfsVisited);
    //             if(response===true) return true;                
    //         }
    //     }
    // }
    let response=await dfsCycleDetectionTracePath(graphComponentMatrix , srcRow ,srcCol ,visited , dfsVisited);
    if(response) return Promise.resolve(true);   

    return Promise.resolve(false); 
}
async function dfsCycleDetectionTracePath(graphComponentMatrix , i ,j ,visited , dfsVisited)
{
    visited[i][j]=true;    
    dfsVisited[i][j]=true;
    let cell=document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);
    cell.style.backgroundColor="lightblue";
    await colorPromise();
    for(let child=0;child<graphComponentMatrix[i][j].length;child++)
    {   
        let[crid, ccid]=graphComponentMatrix[i][j][child];
        if(visited[crid][ccid]===false)
        {
            let response=await dfsCycleDetectionTracePath(graphComponentMatrix,crid,ccid,visited,dfsVisited);
            if(response===true) {
                    cell.style.backgroundColor="transparent"; 
                    await colorPromise();      
                return Promise.resolve(true);
            }
        }
        else
        {
            if(visited[crid][ccid]===true&&dfsVisited[crid][ccid]===true) 
            {
                let cell=document.querySelector(`.cell[rowid="${crid}"][colid="${ccid}"]`);
                cell.style.backgroundColor="lightsalmon";
                await colorPromise();
                cell.style.backgroundColor="tranparent";
                await colorPromise();
                cell.style.backgroundColor="transparent"; 

                return Promise.resolve(true);
            }
        }
    }
    dfsVisited[i][j]=false;
    return Promise.resolve(false);
}

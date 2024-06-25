let collectedGraphComponent= [];
let graphComponentMatrix=[];
// for( let i=0;i< rows;i++)
// {
//     let row=[];
//     for( let j=0;j<col;j++)
//     {

//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }
function isCyclic(graphComponentMatrix)
{
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
    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<col;j++)
        {
            if(visited[i][j]===true) continue;
            else
            {
                let response=dfsCycleDetection(graphComponentMatrix , i ,j ,visited , dfsVisited);
                if(response===true) return [i , j];                
            }
        }
    }
    return null; 
}
function dfsCycleDetection(graphComponentMatrix , i ,j ,visited , dfsVisited)
{
    visited[i][j]=true;
    dfsVisited[i][j]=true;
    for(let child=0;child<graphComponentMatrix[i][j].length;child++)
    {
        let[crid, ccid]=graphComponentMatrix[i][j][child];
        if(visited[crid][ccid]===false)
        {
            let response=dfsCycleDetection(graphComponentMatrix,crid,ccid,visited,dfsVisited);
            if(response===true) return true;
        }
        else
        {
            if(visited[crid][ccid]===true&&dfsVisited[i][j]===true) return true;
        }
    }
    dfsVisited[i][j]=false;
    return false;
}

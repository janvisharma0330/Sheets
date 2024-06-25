for(let i=0;i<rows;i++)
{
    for(let j=0;j<col;j++)
    {
        let cell= document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);
        cell.addEventListener("blur", (e)=>
        {
            let addressbar=document.querySelector(".address-bar");
            let addresss=addressbar.value;
            let[cell,cellprop]=activeCell(addresss);
            let enteredData=cell.innerText;
            if (enteredData === cellprop.value) return;
            cellprop.value=enteredData;
            removeChildFromParent(cellprop.formula);
            cellprop.formula = "";
            updateChildrenCells(addresss);
        })
    }
}
let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e)=>
{

    let inputFormula=formulaBar.value;
    if(e.key=="Enter"&& inputFormula)
    {
        let addressbar=document.querySelector(".address-bar");
        let addresss=addressbar.value;
        let [cell,cellprop]= activeCell(addresss);
        if(inputFormula!=cellprop.formula) removeChildFromParent(cellprop.formula);
        addChildToGraph(addresss,inputFormula);
        let cycleResponse= isCyclic(graphComponentMatrix);
        if(cycleResponse)
        {
            // alert("Your Formula has cycle")
            let response=confirm("Your formula is cyclic. Do you want to trace your path?")
            while (response)
            {
                await isCyclicTracePath(graphComponentMatrix ,cycleResponse);
                response=confirm("Your formula is cyclic. Do you want to trace your path?")
            }
            removeChildFromGraph(inputFormula,addresss);
            return;
        }
        let evaluatedValue=evaluateFormula(inputFormula);
                                                                                                                                                                                                                                                                                                                                                                                                                                    
        setUiCellprop(evaluatedValue,inputFormula,addresss);
        addChildToParent(inputFormula);
        updateChildrenCells(addresss);
    }
})
function removeChildFromGraph(formula , childAddress)
{
    let [crowid , ccolid]=decode(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90)
        {
            let [prid,pcid]=decode(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop(); 
        }
    }    
}
function addChildToGraph(childAddress , formula)
{
    let [crowid , ccolid]=decode(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90)
        {
            let [prid,pcid]=decode(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crowid,ccolid]);
        }
    }
}
function updateChildrenCells(address)
{
   let [cell,cellprop]=activeCell(address);
   let child= cellprop.children;
   for(let i=0;i<child.length;i++)
   {
    let childAddr=child[i];
    let[childCell, childCellProp]=activeCell(childAddr);
     let formula=childCellProp.formula;
     let evaluatedValue=evaluateFormula(formula);
    setUiCellprop(evaluatedValue,formula,childAddr);
    updateChildrenCells(childAddr);
   } 
}
function removeChildFromParent(formula)
{
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let adrs=addressbar.value;
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90)
        {
            let [cell,cellprop]=activeCell(encodedFormula[i]);
            let ind=cellprop.children.indexOf(adrs);
            cellprop.children.slice(ind,1);

        }
    }
}
function addChildToParent(formula)
{
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let adrs=addressbar.value;
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90)
        {
            let [cell,cellprop]=activeCell(encodedFormula[i]);
            cellprop.children.push(adrs)
        }
    }
}
function evaluateFormula(formula)
{
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90)
        {
            let [cell,cellprop]=activeCell(encodedFormula[i]);
            encodedFormula[i]=cellprop.value;
        }
    }
    let decodedFormula=encodedFormula.join(" ");
    return eval(decodedFormula);
}
function setUiCellprop(evaluatedValue, evaluatedFormula)
{
    let address=addressbar.value;
    let[cell,cellprop]=activeCell(address);
    cell.innerText=evaluatedValue;
    cellprop.value=evaluatedValue;
    cellprop.formula=evaluatedFormula;
}
function setUiCellprop(evaluatedValue, evaluatedFormula,address){
    // let address=addressbar.value;
    let[cell,cellprop]=activeCell(address);
    cell.innerText=evaluatedValue;
    cellprop.value=evaluatedValue;
    cellprop.formula=evaluatedFormula;
}

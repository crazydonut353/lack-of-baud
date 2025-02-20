async function asssd() {
    var counter = 290000
    for(let i = 295000; i < 295500; i++) {
    var pics = await fetch("https://headwaters.myschoolapp.com/app/page/pageget/0?format=json&menuId=undefined&menuItemId=0&pageTaskId=" + i + "&pendingInd=false");
    pics = await pics.json();
    if(JSON.stringify(pics).includes("Headwaters")) {
    console.log(pics)
    }
    }
    alert("done!")
}
asssd()

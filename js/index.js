const tag = (tag) => document.querySelector(tag);
const tags = (tag) => document.querySelectorAll(tag);
let isClick = false, offsetXInit, elementMove, offsetTopInit, elMouseMoveCurrent, data;
const elHeight = tag('.list-item').clientHeight + 2;

const listItems = tags('.list-item');
const arrListItem = Array.from(listItems);
const listItemName = tags('.item-name');
const arrListItemName = Array.from(listItemName);
const container = tag('.container')
arrListItem.forEach((el)=>{
    el.addEventListener('mousedown', function(e){
        offsetXInit = e.offsetX;
        isClick = true;
        elementMove = this; // lưu element cần di chuyển
        offsetTopInit = this.offsetTop; // Lấy vị trí top của element cần di chuyển
        console.log('Mouse down', offsetTopInit)
    })
})

// Tạo ra mảng các element có các thuộc tính element, clientY start-end
createClientY(); 
//Xử lý hành động di chuyển element
container.addEventListener('mousemove', function(e){
    let mouseCurrent = e.clientY - 20; // 20 là giá trị của element content cách Top
    if(isClick){
        // Di chuyển xuống
        if(mouseCurrent>offsetTopInit+elHeight){
            console.log('Xuống')
            elMouseMoveCurrent = data.find((el)=>{
                // di chuyển xuống khi tới nửa độ cao bên dưới element
                if(el.offsetTopStart+elHeight/2 <= mouseCurrent && el.offsetTopEnd >= mouseCurrent){
                    return el
                }
            })
            if(elMouseMoveCurrent){
                let elNext = elMouseMoveCurrent.el.nextElementSibling;
                console.log('elNext', elNext)
                container.insertBefore(elementMove ,elNext)
                elementMove.classList.add('wait')
            }
        }else if(mouseCurrent<offsetTopInit){ // Di chuyển lên
            console.log('Lên')
            elMouseMoveCurrent = data.find((el)=>{
                // di chuyển lên khi tới nửa độ cao đầu element
                if(el.offsetTopStart <= mouseCurrent && el.offsetTopStart + elHeight/2 >= mouseCurrent){
                    return el
                }
            })
            if(elMouseMoveCurrent){
                console.log('elPrev', elMouseMoveCurrent.el)
                container.insertBefore(elementMove, elMouseMoveCurrent.el)
                elementMove.classList.add('wait')
            }
        }
        
        
        
    }
})
document.addEventListener('mouseup', (e)=>{
    isClick = false;
    console.log('Mouse up')
    setNameItem();
    setNameModel();
    elementMove.classList.remove('wait');
    elementMove = undefined;
    elMouseMoveCurrent = undefined;
    createClientY();
})
// function set lại tên của bài học
function setNameItem(){
    const listItemName = tags('.item-name');
    const arrListItemName = Array.from(listItemName);
    arrListItemName.forEach((el, index)=>{
        el.textContent = `Bài: ${index+1}:`
    })
}
// function set lại tên Model
function setNameModel(){
    const listItemModel = tags('.item-name-model');
    const arrListItemModel = Array.from(listItemModel);
    arrListItemModel.forEach((el, index)=>{
        el.textContent = `Model: ${index+1}:`
    })
}
// funciton lấy tọa độ các element
function createClientY(){
    data =  arrListItem.map((el)=>{
        return {
            el, offsetTopStart: el.offsetTop , offsetTopEnd : el.offsetTop + elHeight
        }
    })
}
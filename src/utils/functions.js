export const openContent = (id) => {
    document.getElementById(id).style.display = "flex"
}

export const closeContent = (id) => {
    document.getElementById(id).style.display = "none"
}

export const clickOutModal = (e, id) => {
    if(e.target.attributes.id){
        if(e.target.attributes.id.textContent === id){
            closeContent(id)
        }
    }
    
    
}

export const listenEscapeKey = (id)=>{
    document.addEventListener('keydown', (e)=>{
        if(e.key === "Escape"){
            closeContent(id)
        }
    })
}
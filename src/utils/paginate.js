export const paginate = (elements) => {

    const items = 10;
    const pages = Math.ceil(elements.length / items);

    const newElements = Array.from({length: pages},(_,index)=>{
        const start = index * items;
        return elements.slice(start, start + items)
    })

     return newElements;
}

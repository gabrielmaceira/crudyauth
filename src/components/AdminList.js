
import { Item } from './Item'

export const AdminList = ({ itemList }) => {

    return <section className='itemlist-container'>
        {itemList.map(item => {
            return <Item {...item} key={item.id} />
        })}
    </section>

}
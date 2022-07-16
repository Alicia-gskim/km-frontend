import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const CreateTable = ({ id, item }) => {
    // console.log('create table ----- id : ', id, ', item size: ', item);
    if( item.length < 1 ) {
        return <DrawCell id={id} item={'(Empty Object)'} />
    }

    return (
        <TableCell key={id}>
            <Table>
                <TableBody>
                    {item.map( (sItem, sIdx) => {
                        const srUID = sItem[0].concat(sIdx.toString());
                        // console.log(', sub row key : ', srUID, 'subitem index : ', sIdx, ', sub item : ', sItem);

                        return (
                            <DrawRow key={srUID} items={sItem}  />
                        )
                    })}
                </TableBody>
            </Table>
        </TableCell>
    )
}
const DrawRow = ({ items }) => {
    return (
        <TableRow key={items[0]}>
            {items.map( (item, idx) => {
                const uid = items[0].concat(idx.toString());
                // console.log('type : ', typeof item, ', root depth : ', item);

                if( typeof item === 'object' ) {
                    if( item !== null ) {
                        return <CreateTable key={uid} id={uid} item={Object.entries(item)} />
                    } else {
                        return <DrawCell key={uid} id={uid} item={""} />
                    }
                } else {
                    return <DrawCell key={uid} id={uid} item={item.toString() === '' ? '(Empty String)' : item.toString()} />
                }
            })}
        </TableRow>
    )
}
const DrawCell = ({ id, item }) => {
    // console.log('drawcell : ', id, ', item : ', item.toString());
    return (
        <TableCell key={id}>{item.toString()}</TableCell>
    )
}

function TableList( {lists} ) {
    return lists.map( (items, idx) => {
        console.log("#### TableList Type --- ", typeof items, ", ### ITEM : ", items);
        return <DrawRow key={idx} items={items} />
    })
};

TableList.propTypes = {
    lists: PropTypes.array.isRequired
}

export default TableList;
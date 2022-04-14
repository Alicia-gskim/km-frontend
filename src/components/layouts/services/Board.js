import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCallback } from "react";

const Board = ({ gubun, lists }) => {
    console.log("board gubun : ", gubun);
    console.log(lists);

    const onDelete = useCallback( (params) => {
        // console.log("on delete : ", params);
        // console.log("lists : ", lists);
    }, [])

    const rawsView = (params) => {
        // console.log("raws view : ", params);
    }

    const DrawCell = ( {uid, items} ) => {
        return (
            <>
                <TableCell>
                    <Button label="rawview" onClick={rawsView(items)}>
                        <VisibilityIcon />
                    </Button>
                </TableCell>
                <TableCell key={uid}>{items.name}</TableCell>
                <TableCell key={uid}>{items.host}</TableCell>
                <TableCell key={uid}>{items.tags}</TableCell>
                <TableCell key={uid}>{items.created_at}</TableCell>
                <TableCell>
                    <Button label="Delete" onClick={onDelete(items)}>
                        <DeleteIcon />Delete
                    </Button>
                </TableCell>
            </>
        )
    }
    const DrawRow = ({uid, items}) => {
        if(gubun === "head") {
            return <TableRow key={uid}>
                {lists.map((items, idx) => {
                    console.log("gubun : ", gubun, "items : ", items.name);
                    return typeof items.name === 'string'
                        ? <TableCell key={idx}>{items.name}</TableCell>
                        : items.name.map((item, i) => {
                            return <TableCell key={item.concat(i.toString())}>{item}</TableCell>
                        })
                })}
            </TableRow>
        } else {
            return (
                <TableRow key={uid}>
                    <DrawCell key={uid} uid={uid} items={items} />
                </TableRow>
            )
        }
    }

    if(gubun === "head") {
        return <DrawRow key='key' uid='uid' items={lists} />
    } else {
        return lists ? lists.map(
            (items, idx) => {
                return <DrawRow key={idx} uid={idx} items={items} />
            }) : <DrawRow key='key' uid='uid' items={[]} />
    }
}

Board.propTypes = {
    lists: PropTypes.array.isRequired
}

export default Board;
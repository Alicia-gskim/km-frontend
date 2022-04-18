import { Button, TableCell, TableRow, ToggleButton } from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import LinkIcon from '@mui/icons-material/Link';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { useCallback, useState } from "react";

const Board = ({ gubun, lists, headers }) => {
    const [selected, setSelected] = useState(false);
    
    console.log("board gubun : ", gubun, ", headers : ", headers);
    console.log(lists);

    const onEdit = useCallback((params) => {
        console.log("onEdit : ", params);
    }, []);
    const onDelete = useCallback((params) => {
        console.log("onDelete : ", params);
    }, []);
    const rawView = (params) => {
        console.log("raw view : ", params);
    }

    const DrawCell = ( {uid, items} ) => {
        console.log("headers : ", headers ,", items : ", items);

        return <TableRow key={"row-".concat(uid.toString())}>
            {headers.map( (nm, idx) => {
                console.log("idx : ", idx, ", nm : ", nm);
                const cellKey = uid.toString().concat("-").concat(nm.id);
                if( typeof nm.id === 'string') {
                    console.log(items[nm.id]);
                    if( typeof items[nm.id] === 'object' ) {
                        // object 타입 구분(array, json)
                        if( typeof items[nm.id].length === 'number' ) {
                            // array인 경우
                            if( items[nm.id].length > 0 ) {
                                return items[nm.id].map( (data, i) => {
                                    console.log('data : ', data, ', cellkey : ', cellKey.concat('-').concat(i.toString()));
                                    return <TableCell key={cellKey.concat('-').concat(i.toString())}>{data}</TableCell>
                                })
                            } else {
                                return <TableCell key={cellKey}></TableCell>
                            }
                        } else {
                            // json인 경우
                            const objValue = Object.values(items[nm.id]);
                            objValue ? objValue.map( (data, i) => {
                                return <TableCell key={cellKey.concat('-').concat(i.toString())}>{data}</TableCell>
                            })
                            : <TableCell key={cellKey}></TableCell>
                        }
                    } else {
                        return <TableCell key={cellKey}>{items[nm.id]}</TableCell>
                    }
                } else {
                    return (nm.id).map( (sub, no) => {
                        const cellKey = idx.toString().concat("-").concat(sub);
                        let renderBtnDom;
                        switch(sub) {
                            case "strip-path": 
                                renderBtnDom = <ToggleButton value="" selected={selected} onChange={() => {setSelected(!selected)}}>
                                    <LinkOffIcon />
                                </ToggleButton>
                                break;
                            case "preserve-host":
                                renderBtnDom = <ToggleButton value="" selected={selected} onChange={() => {setSelected(!selected)}}>
                                    <CloudOffIcon />
                                </ToggleButton>
                                break;
                            case "edit":
                                renderBtnDom = <Button label="Edit" onClick={onEdit(items)}>
                                    <EditIcon />Edit
                                </Button>
                                break;
                            case "delete":
                                renderBtnDom = <Button label="Delete" onClick={onDelete(items)}>
                                    <DeleteIcon />Delete
                                </Button>
                                break;
                            default:
                                renderBtnDom = <Button label={sub} onClick={rawView(items)}>
                                    <VisibilityIcon />
                                </Button>
                                break;
                        }
                        return <TableCell key={cellKey}>
                            {renderBtnDom}
                        </TableCell>
                    })
                }
            })}
        </TableRow>
        // return (
        //     <>
        //         <TableCell key={uid.toString().concat("-rawview")}>
        //             <Button label="rawview" onClick={rawsView(items)}>
        //                 <VisibilityIcon />
        //             </Button>
        //         </TableCell>
        //         <TableCell key={uid.toString().concat("-name")}>{items.name}</TableCell>
        //         <TableCell key={uid.toString().concat("-host")}>{items.host}</TableCell>
        //         <TableCell key={uid.toString().concat("-tags")}>{items.tags}</TableCell>
        //         <TableCell key={uid.toString().concat("-created_at")}>{items.created_at}</TableCell>
        //         <TableCell key={uid.toString().concat("-delete")}>
        //             <Button label="Delete" onClick={onDelete(items)}>
        //                 <DeleteIcon />Delete
        //             </Button>
        //         </TableCell>
        //     </>
        // )
    }
    const DrawRow = ({uid, items}) => {
        if(gubun === "head") {
            return <TableRow key={uid}>
                {items.map((item, idx) => {
                    console.log("gubun : ", gubun, ", id : ", item.id, ", items : ", item.name);
                    return typeof item.id === 'string'
                        ? <TableCell key={item.id.concat("-").concat(idx.toString())}>{item.name}</TableCell>
                        : item.id.map((it, i) => {
                            return <TableCell key={it.concat(i.toString())}>{item.name}</TableCell>
                        })
                })}
            </TableRow>
        } else {
            return (
                <DrawCell key={"cell-".concat(uid.toString())} uid={"cell-".concat(uid.toString())} items={items} />
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
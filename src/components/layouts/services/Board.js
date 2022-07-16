import { Box, Button, TableCell, TableRow, ToggleButton, Tooltip } from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Link from '@mui/icons-material/Link';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { useCallback, useState } from "react";
import BasicModal from "../popups/BasicModal";

const Board = ({gubun, lists, headers}) => {

    const [routesItem, setRoutesItem] = useState({});
    
    const [pathSelected, setPathSelected] = useState(false);
    const [hostSelected, setHostSelected] = useState(false);
    
    const linkElement = pathSelected ? <LinkOffIcon /> : <Link />;
    const cloudElement = hostSelected ? <CloudQueueIcon /> : <CloudOffIcon />;

    const onEdit = (params) => {
        console.log("onEdit : ", params);
    };
    const onDelete = (params) => {
        console.log("onDelete : ", params);
    };
    const rawView = (params) => {
        console.log("raw view : ", params);
    }

    const onStripPath = (params) => {
        console.log("handleclick : ", params);
        console.log("routes id : ", lists);
        setPathSelected(!params);
    }

    const [open, setOpen] = useState(false);
    const handleModalOpen = () => {
        setOpen(true);
    }
    const handleModalClose = () => {
        setOpen(false);
    }

    const DrawCell = ( {uid, items} ) => {
        // console.log("headers : ", headers ,", items : ", items);

        return <TableRow key={"row-".concat(uid.toString())}>
            {headers.map( (nm, idx) => {
                // console.log("idx : ", idx, ", nm : ", nm);
                const cellKey = uid.toString().concat("-").concat(nm.id);
                if( typeof nm.id === 'string') {
                    // console.log(items[nm.id]);
                    if( typeof items[nm.id] === 'object' ) {
                        // object 타입 구분(array, json)
                        if( typeof items[nm.id].length === 'number' ) {
                            // array인 경우
                            if( items[nm.id].length > 0 ) {
                                let subStr = "";
                                items[nm.id].map( (data, i) => {
                                    // console.log('data : ', data, ', cellkey : ', cellKey.concat('-').concat(i.toString()));
                                    // return <TableCell key={cellKey.concat('-').concat(i.toString())}>{data}</TableCell>
                                    subStr += data;
                                    if( i < (items[nm.id].length-1) ) {
                                        subStr += '|';
                                    }
                                    return subStr;
                                })
                                return <TableCell key={cellKey}>{subStr}</TableCell>
                            } else {
                                return <TableCell key={cellKey}></TableCell>
                            }
                        } else {
                            // json인 경우
                            const objValue = Object.values(items[nm.id]);
                            return objValue ? objValue.map( (data, i) => (
                                <TableCell key={cellKey.concat('-').concat(i.toString())}>{data}</TableCell>
                            ))
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
                                renderBtnDom = <Tooltip title="Strip Path">
                                    <ToggleButton value="" selected={pathSelected} onClick={() => onStripPath(pathSelected)}>
                                        {linkElement}
                                    </ToggleButton>
                                </Tooltip>
                                break;
                            case "preserve-host":
                                renderBtnDom = <Tooltip title="Preserve Host">
                                    <ToggleButton value="" selected={hostSelected} onClick={() => {setHostSelected(!hostSelected)}}>
                                        {cloudElement}
                                    </ToggleButton>
                                </Tooltip>
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
                                renderBtnDom = <Box>
                                    <Tooltip title="Raw view">
                                        <Button label={sub} onClick={handleModalOpen}>
                                            <VisibilityIcon />
                                        </Button>
                                    </Tooltip>
                                    <BasicModal open={open} onClose={handleModalClose} contents={items}/>
                                </Box>
                                break;
                        }
                        return <TableCell key={cellKey}>
                            {renderBtnDom}
                        </TableCell>
                    })
                }
            })}
        </TableRow>
    }
    const DrawRow = ({uid, items}) => {
        if(gubun === "head") {
            return <TableRow key={uid}>
                {items.map((item, idx) => {
                    // console.log("gubun : ", gubun, ", id : ", item.id, ", items : ", item.name);
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
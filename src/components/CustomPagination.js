import { Box, styled } from "@mui/material";
import Fab from '@mui/material/Fab';

const StyledNav = styled('nav') (() =>`
        margin:0;
        margin-top:16px;
    `
)
const StyledUl = styled('ul') (() =>`
        display:-webkit-box;
        display:-webkit-flex;display:-ms-flexbox;
        display:flex;
        -webkit-box-flex-wrap:wrap;
        -webkit-flex-wrap:wrap;
        -ms-flex-wrap:wrap;
        flex-wrap:wrap;
        -webkit-align-items:center;
        -webkit-box-align:center;
        -ms-flex-align:center;
        align-items:center;
        padding:0;
        margin:0;
        list-style:none;
    `
)

const StyledLi = styled('li') (() => `
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }`
)
const StyledButton = styled('button') (() => `
        color:#fff;
        background-color:#3366FF;
        background-color:rgba(145, 158, 171, 0.16);
        display:-webkit-inline-box;
        display:-webkit-inline-flex;
        display:-ms-inline-flexbox;
        display:inline-flex;
        -webkit-align-items:center;
        -webkit-box-align:center;
        -ms-flex-align:center;
        align-items:center;
        -webkit-box-pack:center;
        -ms-flex-pack:center;
        -webkit-justify-content:center;
        justify-content:center;
        position:relative;
        box-sizing:border-box;
        -webkit-tap-highlight-color:transparent;
        background-color:transparent;
        outline:0;
        border:0;
        margin:0;
        border-radius:0;
        padding:0;
        cursor:pointer;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        vertical-align:middle;
        -moz-appearance:none;
        -webkit-appearance:none;
        -webkit-text-decoration:none;
        text-decoration:none;
        color:inherit;
        line-height:1.5714285714285714;
        font-size:0.875rem;
        font-family:Public Sans,sans-serif;
        font-weight:400;
        border-radius:16px;
        text-align:center;
        box-sizing:border-box;
        min-width:32px;
        height:32px;
        padding:0 6px;
        margin:0 3px;
        color:#212B36;
        -webkit-transition:color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        transition:color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

        &:select {
            color:#fff;
            background-color:#3366FF;
        }
    `
)

const CustomPagination = ({ listPerPage, totalList, paginate }) => {
    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(totalList / listPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Box>
            <StyledNav>
                <StyledUl>
                    {/* <StyledLi key={"prevLi"}>
                        <StyledButton>
                            <svg focusable="false" viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                            </svg>
                        </StyledButton>
                    </StyledLi> */}
                    {pageNumbers.map( (number) => (
                        <StyledLi key={number}>
                            <StyledButton variant="outlined" onClick={() => paginate(number)}>
                                {number}
                            </StyledButton>
                        </StyledLi>
                    ))}
                    {/* <StyledLi key={"nextLi"}>
                        <StyledButton>
                            <svg focusable="false" viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                            </svg>
                        </StyledButton>
                    </StyledLi> */}
                </StyledUl>
            </StyledNav>
            {/* <Navigation>
                <ul>
                    {pageNumbers.map( (number) => (
                        <li key={number}>
                            <button onClick={() => paginate(number)} className="page-link">
                                <svg>{number}</svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </Navigation> */}
        </Box>
    )
}

export default CustomPagination;
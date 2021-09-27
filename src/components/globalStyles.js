import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  h5, th, td {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  };
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  };
  div, span {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  };
  .chip {
    display: inline-block;
    padding: 0 15px;
    margin: 0 5px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-radius: 25px;
    background-color: ${({ theme }) => theme.chipBackground};
  };

  .statChip {
    display: inline-block;
    padding: 5px;
    margin: 5px;
    border-radius: 25px;
    background-color: ${({ theme }) => theme.chipBackground};
  };
  
  .stats {
    flex-direction: row;
  }

  `

  

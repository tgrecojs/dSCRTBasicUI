import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'right',
    },
    logo: {
        //position: 'absolute',
        marginBottom: '50px',
        justifyContent: 'center',
        display: 'flex',
        //flex: '1',
        width: '120px',
        height: '22px',
        left: '60px',
        top: '70px',
    },
    drawer: {
        paddingTop: '20px',
        width: '250px',
        background: 'linear-gradient(180deg, rgba(38, 34, 80, 0.65) 0%, rgba(27, 25, 66, 0.85) 57.44%, #17163B 100%)',
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        color: '#979797',
        padding: '10px 8px',
        justifyContent: 'center',
        textTransform: 'none',
        letterSpacing: 0,
        background: 'transparent',
        width: '100%',
    },
    selectedButton: {
        color: '#53B9EA',
    },
    btnRoot: {
        paddingLeft: '25px',
        justifyContent: 'left !important',
    },
    subMenu: {
        paddingLeft: '50px !important',
    },
    iconNotSelected: {
        color: 'transparent',
        hidden: true,
    },
    iconSelected: {
        color: '#53B9EA',
        fontSize: '24px',
    },
}));
export default useStyles;

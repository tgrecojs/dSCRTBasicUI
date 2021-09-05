import React, { useState, forwardRef } from 'react';
import { List, ListItem, Collapse, Button, Drawer, Icon } from '@material-ui/core';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import menuItems from './sideBarItems';
import { NavLink as RouterLink } from 'react-router-dom';
import useStyles from './menuBarStyles';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const MenuBar = (props) => {
    const [menu, setMenu] = useState({});
    const [selected, setSelected] = useState('');
    const { className, ...rest } = props;
    const classes = useStyles();
    const handleClick = (item) => {
        let newData = { ...menu, [item]: !menu[item] };
        setMenu(newData);
    };
    const CustomRouterLink = forwardRef((props, ref) => (
        <div ref={ref} style={{ flexGrow: 1 }}>
            <RouterLink {...props} />
        </div>
    ));
    const handleMenu = (children, level = 0) => {
        return children.map(({ name, url, links }) => {
            return (
                <List component="div" disablePadding key={name}>
                    <ListItem className={classes.item} disableGutters style={{ padding: '0px' }} key={name}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon
                                className={clsx({
                                    [classes.iconNotSelected]: selected !== name,
                                    [classes.iconSelected]: selected === name,
                                })}
                            >
                                <FiberManualRecordIcon />
                            </Icon>

                            <Button
                                className={clsx({
                                    [classes.btnRoot]: true,
                                    [classes.button]: true,
                                    [classes.subMenu]: level,
                                    [classes.selectedButton]: selected === name,
                                })}
                                component={CustomRouterLink}
                                onClick={() => {
                                    setSelected(name);
                                }}
                                to={url}
                            >
                                {name}
                            </Button>
                        </div>
                    </ListItem>
                </List>
            );
        });
    };
    return (
        <Drawer anchor="left" classes={{ paper: classes.drawer }} open={true} variant="persistent">
            <div className={classes.logo}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => {}}
                        color="primary"
                    >
                        <HelpOutlineIcon />
                    </IconButton>
                    <div>DSCRT</div>
                </div>
            </div>
            <List {...rest} className={clsx(classes.root, className)}>
                {handleMenu(menuItems.data)}
            </List>
        </Drawer>
    );
};
export default MenuBar;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Progress, Alert, Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import { logoutUser } from "../../actions/auth.js";
import HomeIcon from "../Icons/SidebarIcons/HomeIcon.js";
import NotificationsIcon from "../Icons/SidebarIcons/NotificationsIcon.js";
import TablesIcon from "../Icons/SidebarIcons/TablesIcon.js";
import TypographyIcon from "../Icons/SidebarIcons/TypographyIcon.js";
import UIElementsIcon from "../Icons/SidebarIcons/UIElementsIcon.js";
import SofiaLogo from "../Icons/SidebarIcons/SofiaLogo.js";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    activeItem: "",
  }

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('transitionend', () => {
      if (this.props.sidebarOpened) {
        this.element.classList.add(s.sidebarOpen);
      }
    }, false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sidebarOpened !== prevProps.sidebarOpened) {
      if (this.props.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = '';
        }, 0);
      }
    }
  }

  doLogout(id) {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav className={s.root}
           ref={(nav) => {
             this.element = nav;
           }}
      >
        <header className={s.logo}>
          <SofiaLogo/>
          <span className={s.title}>SOFIA</span>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<HomeIcon className={s.sidebarIcon}/>}
            link="/app/dashboard"
            index="dashboard"
            badge="9"
          />
          <h5 className={[s.navTitle, s.groupTitle].join(" ")}>TEMPLATE</h5>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Typography"
            isHeader
            iconName={<TypographyIcon />}
            link="/app/typography"
            index="typography"
          />
          <LinksGroup
            onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
            activeItem={this.props.activeItem}
            header="Tables"
            isHeader
            iconName={<TablesIcon className={s.menuIcon} />}
            link="/app/tables"
            index="tables"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Notifications"
            isHeader
            iconName={<NotificationsIcon className={s.menuIcon}/>}
            link="/app/notifications"
            index="notifications"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="UI Elements"
            isHeader
            iconName={<UIElementsIcon className={s.menuIcon}/>}
            link="/app/uielements"
            index="uielements"
            childrenLinks={[
              {
                header: 'Icons', link: '/app/ui-elements/icons',
              },
              {
                header: 'Charts', link: '/app/ui-elements/charts',
              },
              {
                header: 'Google Maps', link: '/app/ui-elements/maps',
              },
            ]}
          />
        </ul>
        <div className="bg-widget d-flex mt-auto ml-1">
          <Button className="rounded-pill my-3 body-2 d-none d-md-block" type="submit" color="secondary-red">Unlock Full Version</Button>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));

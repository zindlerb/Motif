import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import $ from 'jquery';

import dragManager from '../dragManager';
import {
  componentTypes,
  SIDEBAR_WIDTH
} from '../constants';

const MComponentDataRenderer = React.createClass({
  render() {
    /* TD: expand for custom components */
    let component;
    let { context, mComponentData, actions } = this.props;
    let { hoveredComponentId, activeComponentId } = context;
    const { htmlProperties, sx, componentType } = mComponentData;

    const isActiveComponent = activeComponentId === mComponentData.id;
    const componentProps = Object.assign({
      className: classnames(
        'node_' + mComponentData.id,
        'c-pointer',
        {
          'active-component': isActiveComponent,
          'hovered-component': (
            !isActiveComponent &&
            hoveredComponentId === mComponentData.id
          )
        }
      ),
      onMouseEnter: () => {
        //TD: test that this works
        actions.hoverComponent(this.props.mComponentData.id);
      },
      onMouseLeave: () => {
        actions.unHoverComponent();
      },
      onClick: (e) => {
        actions.selectComponent(mComponentData.id);
        e.stopPropagation();
        e.preventDefault();
      },
      style: sx,
    }, this.props);

    if (componentType === componentTypes.LINK) {
      component = React.createElement(
        'a',
        Object.assign({ href: htmlProperties.href }, componentProps),
        htmlProperties.text
      );
    } else if (componentType === componentTypes.CONTAINER) {
      component = React.createElement(
        sx.listStyleType !== 'none' ? 'ul' : 'div',
        componentProps,
        _.map(mComponentData.children, function (child) {
          return (
            <MComponentDataRenderer
                key={child.id}
                actions={actions}
                mComponentData={child}
                context={context}
            />
          );
        })
      );
    } else if (componentType === componentTypes.HEADER) {
      component = React.createElement('h1', componentProps, htmlProperties.text);
    } else if (componentType === componentTypes.TEXT) {
      component = React.createElement('p', componentProps, htmlProperties.text);
    } else if (componentType === componentTypes.IMAGE) {
      component = React.createElement(
        'img',
        Object.assign({ src: htmlProperties.src }, componentProps)
      );
    }

    if (mComponentData.parent && mComponentData.parent.sx.listStyleType !== 'none') {
      return <li>{component}</li>;
    } else {
      return component;
    }
  }
});

const DragHandle = React.createClass({
  getInitialState() {
    return {};
  },
  dragStart(e) {
    let diff;
    const {
      direction,
      rendererWidth,
    } = this.props;
    // add a drag manager for listening and unlistening to events
    const that = this;
    dragManager.start(e, {
      dragType: 'resize',
      initialX: e.clientX,
      initialWidth: rendererWidth,
      onDrag(e) {
        if (direction === 'left') {
          diff = (e.clientX - this.initialX);
        } else {
          diff = (this.initialX - e.clientX);
        }

        this.newWidth = this.initialWidth - (diff * 2);

        if (this.newWidth > 30 &&
            this.newWidth < ($(window).width() - (SIDEBAR_WIDTH * 2) - 80)) {
          that.props.setRendererWidth(this.newWidth);
        }
      },
      onEnd: () => {
        this.setState({ isDragging: false });
      }
    });

    this.setState({ isDragging: true });
  },
  render() {
    let height = 60;
    let width = 20;
    let left;
    let src;
    const {
      direction,
    } = this.props;

    if (direction === 'left') {
      left = -width;
      src = 'public/img/assets/left-handle.svg';
    } else if (direction === 'right') {
      left = '100%';
      src = 'public/img/assets/right-handle.svg';
    }

    let style = {
      height,
      width,
      left
    }

    return (
      <img
          draggable={false}
          className={classnames(
              'drag-handle',
              this.state.isDragging ? 'c-grabbing' : 'c-grab')}
          style={style}
          onMouseDown={this.dragStart}
          src={src}
      />
    );
  }
});


const StaticRenderer = React.createClass({
  getInitialState() {
    return {
      isMouseInRenderer: false,
    };
  },

  mouseEnter() {
    this.setState({ isMouseInRenderer: true });
  },

  mouseLeave() {
    this.setState({ isMouseInRenderer: false });
  },

  render() {
    let {
      renderTree,
      activeComponentId,
      hoveredComponentId,
      width,
      setRendererWidth,
      actions
    } = this.props;
    let renderer;

    if (renderTree) {
      renderer = (
        <MComponentDataRenderer
            mComponentData={renderTree}
            actions={actions}
            context={{
              activeComponentId,
              hoveredComponentId,
              isMouseInRenderer: this.state.isMouseInRenderer
            }}
        />
      );
    }

    return (
      <div
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onMouseMove={this.mouseove}
          style={{ width }}
          className={classnames('renderer-container flex-auto m-auto relative static-view-border')}
      >
        {renderer}
        <DragHandle
            direction="left"
            rendererWidth={width}
            setRendererWidth={setRendererWidth}
            actions={actions}
        />
        <DragHandle
            direction="right"
            rendererWidth={width}
            setRendererWidth={setRendererWidth}
            actions={actions}
        />
      </div>
    );
  },
});

export default StaticRenderer;

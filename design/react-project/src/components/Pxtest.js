/**
 * This source code is exported from pxCode, you can get more document from https://www.pxcode.io
 */
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export default function Pxtest(props) {
  return (
    <div className={`pxtest ${css(styles.group, styles.group_layout)}`}>
      /*This group structure is not ready for flow layout, please resolve the 🐞
      structure bug in pxCode editor.*/
    </div>
  );
}

Pxtest.inStorybook = true;

const styles = StyleSheet.create({
  group: {
    display: 'flex',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: '18px 18px 18px 18px'
  },
  group_layout: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 800,
    flexGrow: 1
  }
});

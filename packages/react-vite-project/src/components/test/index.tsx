// import React, { useMemo, useState } from 'react';
// // import Dialog from './dialog';

import { useState } from 'react';

// // class Modal extends React.PureComponent {
// //   /* 渲染底部按钮 */
// //   renderFooter = () => {
// //     const { onOk, onCancel, cancelText, okText, footer } = this.props;
// //     /* 触发 onOk / onCancel 回调  */
// //     if (footer && React.isValidElement(footer)) return footer;
// //     return (
// //       <div className="model_bottom">
// //         <div className="model_btn_box">
// //           <button
// //             className="searchbtn"
// //             onClick={(e) => {
// //               onOk && onOk(e);
// //             }}
// //           >
// //             {okText || '确定'}
// //           </button>
// //           <button
// //             className="concellbtn"
// //             onClick={(e) => {
// //               onCancel && onCancel(e);
// //             }}
// //           >
// //             {cancelText || '取消'}
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   };

// //   /* 渲染顶部 */
// //   renderTop = () => {
// //     const { title, onClose } = this.props;
// //     return (
// //       <div className="model_top">
// //         <p>{title}</p>
// //         <span className="model_top_close" onClick={() => onClose && onClose()}>
// //           x
// //         </span>
// //       </div>
// //     );
// //   };

// //   /* 渲染弹窗内容 */
// //   renderContent = () => {
// //     const { content, children } = this.props;
// //     return React.isValidElement(content) ? content : children ? children : null;
// //   };
// //   render() {
// //     const { visible, width = 500, closeCb, onClose } = this.props;
// //     return (
// //       <Dialog
// //         closeCb={closeCb}
// //         onClose={onClose}
// //         visible={visible}
// //         width={width}
// //       >
// //         {this.renderTop()}
// //         {this.renderContent()}
// //         {this.renderFooter()}
// //       </Dialog>
// //     );
// //   }
// // }

// /* 挂载方式调用modal */
// export default function Index() {
//   //   const [visible, setVisible] = useState(false);
//   //   const [nameShow, setNameShow] = useState(false);
//   //   const handleClick = () => {
//   //     console.log('点击');
//   //     setVisible(!visible);
//   //     setNameShow(!nameShow);
//   //   };
//   //   /* 防止 Model 的 PureComponent 失去作用 */
//   //   const [handleClose, handleOk, handleCancel] = useMemo(() => {
//   //     const Ok = () => console.log('点击确定按钮');
//   //     const Close = () => setVisible(false);
//   //     const Cancel = () => console.log('点击取消按钮');
//   //     return [Close, Ok, Cancel];
//   //   }, []);

//   return (
//     <div>
//       {/* <Modal
//         onCancel={handleCancel}
//         onClose={handleClose}
//         onOk={handleOk}
//         title={'《React进阶实践指南》'}
//         visible={visible}
//         width={700}
//       >
//         <div className="feel">
//           小册阅读感受： <input placeholder="写下你的感受" />
//           {nameShow && <p>作者： 我不是外星人</p>}
//         </div>
//       </Modal> */}
//       {/* <button
//         onClick={() => {
//           setVisible(!visible);
//           setNameShow(false);
//         }}
//       >
//         model show
//       </button>
//       <button onClick={handleClick}> model show ( 显示作者 ) </button> */}
//     </div>
//   );
// }

const Modal = ({ visible, close, children, width, title, ok, cancel }) => {
  if (!visible) {
    return <></>;
  }

  const renderTop = () => {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div style={{ cursor: 'pointer' }}>{title}</div>
        <div style={{ cursor: 'pointer' }} onClick={close}>
          x
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return <div style={{ marginTop: 20 }}>{children}</div>;
  };

  const renderFooter = () => {
    return (
      <div
        style={{ position: 'absolute', bottom: 0, right: 10, display: 'flex' }}
      >
        <div style={{ paddingRight: 8 }} onClick={cancel}>
          cancel
        </div>
        <div onClick={ok}>ok</div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width,
        border: '1px solid black',
        marginTop: 20,
        minHeight: 150
      }}
    >
      {renderTop()}

      {renderContent()}

      {renderFooter()}
    </div>
  );
};

const Test = () => {
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    console.log('🚀 ~ handleOk ~ handleOk:');
  };

  const handleCancel = () => {
    console.log('🚀 ~ handleCancel ~ handleCancel:');
  };

  return (
    <div>
      <button
        style={{ cursor: 'pointer' }}
        onClick={() => setVisible(!visible)}
      >
        click
      </button>
      <Modal
        visible={visible}
        close={() => setVisible(false)}
        width={700}
        title={'title'}
        ok={handleOk}
        cancel={handleCancel}
      >
        <div>hello,this is modal</div>
      </Modal>
    </div>
  );
};
export default Test;

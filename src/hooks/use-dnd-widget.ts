// export default function useDnDWidget() {
//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const widgetId = event.dataTransfer.getData('widgetId');
//     const draggedWidgetIndex = widgets.findIndex((widget) => widget.id === widgetId);
//     if (draggedWidgetIndex !== -1) {
//       const newWidgets = [...widgets];
//       newWidgets.splice(draggedWidgetIndex, 1);

//       const targetIndex = Array.from(event.currentTarget.children).findIndex((element) =>
//         element.contains(event.target as Node),
//       );
//       console.log('targetIndex ', targetIndex);
//       if (targetIndex !== -1) {
//         newWidgets.splice(targetIndex, 0, { ...widgets[draggedWidgetIndex], columnId: id });
//         setWidgets(newWidgets);
//       }
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };
//   return {
//     handleDrop,
//     handleDragOver,
//   };
// }

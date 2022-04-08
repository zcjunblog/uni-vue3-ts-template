/*
 * @Date: 2022-03-16 18:59:31
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-03-23 18:42:03
 * @FilePath: \awen-patient-h5\src\directive.ts
 */
export default function directive(app) {
    // 示例
    // app.directive('xxx', {
    //     // 指令首次绑定到元素且在安装父组件之前...「等同于bind」
    //     beforeMount(el, binding, vnode, prevVnode) {
    //         // binding:数据对象
    //         //   + arg:传给指令的参数   v-xxx:n -> arg:"n"
    //         //   + modifiers:修饰符对象 v-xxx.stop -> modifiers:{stop:true}
    //         //   + value:指令绑定的值   v-xxx="1+1" -> value:2
    //         //   + oldValue:之前绑定的值
    //     },
    //     // 安装绑定元素的父组件时...「等同于inserted」
    //     mounted() {},
    //     // 在包含组件的VNode更新之前...
    //     beforeUpdate() {},
    //     // 在包含组件的VNode及其子VNode更新后...「等同于componentUpdated」
    //     updated() {},
    //     // 在卸载绑定元素的父组件之前...
    //     beforeUnmount() {},
    //     // 指令与元素解除绑定且父组件已卸载时...「等同于unbind」
    //     unmounted() {}
    // });

    // 外部点击  例: <button v-clickoutside="clickoutside">点击</button>
    app.directive('clickoutside', {
        beforeMount(el, binding) {
            document.addEventListener(
                'click',
                e => {
                    // contains判断一个元素是否在另一个元素内
                    // console.log('el', el)

                    // console.log('e.target', e.target)

                    // console.log('el.contains(e.target)', el.contains(e.target))

                    !el.contains(e.target) && binding.value()
                },
                false
            )
        },
        unmounted() {
            document.removeEventListener('click', () => {})
        }
    })
}

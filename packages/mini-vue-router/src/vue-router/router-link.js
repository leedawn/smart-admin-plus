import { h, inject } from 'vue'

function useLink(props) {
    // inject 和 provide ，父组件深处传递给子组件的信息
    const router = inject('router')
    function navigate() {
        router.push(props.to)
    }
    return {
        navigate
    }
}
export const RouterLink = {
    name: 'RouterLink',
    props: {
        to: {
            type: [String, Object],
            required: true
        }
    },
    setup(props, { slots }) {
        const link = useLink(props);
        return () => {
            return h('a', { 
                onClick: link.navigate
            }, slots.default && slots.default())
        }
    }
}
import { Route } from 'react-router-dom'

type KokopelliRouteProps = {
    component: React.ReactNode
    path: string
}

const KokopelliRoute = (props: KokopelliRouteProps) => {
    return <Route path={props.path} exact>
        { props.component }
    </Route>
}

export default KokopelliRoute
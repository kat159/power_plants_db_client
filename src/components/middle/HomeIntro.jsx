import React from 'react'
import { Typography} from 'antd';


const { Title } = Typography;

export default function HomeIntro() {
    return (
        <div>
            <Title style={{marginLeft: '20px', marginTop: '20px'}} level={3}>Overview</Title>
            <div style={{ marginLeft: '50px', marginRight: '80px' }}>
                <Title level={5}>
                    Depending on what you believe, climate change may be one of the major immediate existential threats facing human civilization. If we can suppose the above statement is true, what can be done to reduce the contributing factors accelerating this global issue?
                </Title>
                <Title level={5}>
                    The United States Environmental Protection Agency (USEPA) reports that electricity and heat generation worldwide accounts for 25% of emissions contributing to anthropogenic climate change, the largest of any economic sector. This is due to the fact that the vast majority of electricity and heat is generated from burning some form of fossil fuel, e.g. coal, oil, natural gas.
                </Title>
                <Title level={5}>
                    It would stand to reason, then, that a potential solution to reducing one of the primary contributors of human driven climate change is to replace fossil fuel burning power generation with power plants utilizing more sustainable technologies.
                </Title>
                <Title level={5}>
                    To accomplish this task, a database of current power generating facilities would be needed in order to identify ideal candidates for replacement. This database would include data of over 25,000  power generating facilities from over 160 countries and would help facilitate governmental decision making by providing fast access to comprehensive and relevant facility information.
                </Title>
            </div>
            <Title style={{marginLeft: '20px', marginTop: '20px'}} level={3}>Citation</Title>
            <div style={{ marginLeft: '50px', marginRight: '80px' }}>
                <Title level={5}>
                    data resource: <a href='https://datasets.wri.org/dataset/globalpowerplantdatabase' >World Resources Institude</a>
                </Title>
            </div>
        </div>
    )
}

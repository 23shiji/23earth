import React, {Component} from 'react';
import { MapDataPart } from '../../types/map';
import { mapStatus, toolsStatus } from './store';
import { RegionInfo } from '../../types/region';


interface BackgroundProps {
    background: MapDataPart[]
}

export class Background extends Component<BackgroundProps>{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return (<g>
            {this.props.background.map(({id, path, transform}) => (
                <path 
                    d={path}
                    key={id}
                    id={id}
                    fill="black"
                    transform={transform || undefined}
                    stroke="white"
                    strokeWidth={0.5}
                    onClick={() => mapStatus.addPart(id)}
                    onMouseOver={evt => {
                        if(evt.buttons > 0 && toolsStatus.paintMode === 'swipe'){
                            mapStatus.addPart(id)
                        }
                    }}
                    />
            ))}
        </g>)
    }
}

interface RegionLayerProps {
    regions: RegionInfo[]
    generation: number
    getPartById: (id: string) => MapDataPart
    onClick?: (partId: string, regionId: string) => void
    onMouseOver?: (partId: string, regionId: string) => void
}

export class RegionLayer extends Component<RegionLayerProps> {
    shouldComponentUpdate(nextProps: RegionLayerProps): boolean{
        return nextProps.generation == 0 || nextProps.generation !== this.props.generation
    }
    render(){
        const {regions, onClick, onMouseOver} = this.props
        return (<g>
            {regions.map(reg => (
                <g key={reg.id}>
                    {reg.parts.map(this.props.getPartById).map(part => (
                        <path
                            key={part.id}
                            d={part.path}
                            fill={reg.color}
                            stroke="white"
                            transform={part.transform || undefined}
                            strokeWidth={1}
                            onClick={() => onClick && onClick(part.id, reg.id)}
                            onMouseOver={evt => onMouseOver && evt.buttons>0 && onMouseOver(part.id, reg.id)}
                        />
                    ))}
                </g>
            ))}
        </g>)
    }
}

type MapContentProps = BackgroundProps & RegionLayerProps

export const MapContent = ({background, ...rest}: MapContentProps) => (
    <g>
        <Background background={background}/>
        <RegionLayer {...rest}/>
    </g>
)

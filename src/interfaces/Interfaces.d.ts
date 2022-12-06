export interface ImagesInterfaces {
    key: string,
    url: string
}

export interface GraphicsDescription {
    color: number,
    alpha: number
}

export interface TextDescription {
    x: number,
    y: number,
    text: string,
    style: TextStyle
}

export interface ImgDescription {
    x: number,
    y: number,
    key: string
}

export interface SpriteDescription extends ImgDescription {
}

export interface TextStyle {
    fontSize: string,
    fill: string,
    align: string
}

export interface ArrayDescription {
    row: number,
    column: number
}

export interface ArrayWithDeltaRowDescription extends ArrayDescription {
    deltaRow: number
}
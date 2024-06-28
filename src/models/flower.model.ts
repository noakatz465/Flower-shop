export class FlowerModel  {
    id: number;
    img: string
    name: string;
    price: number;
    types: string[];

    static index: number = 0;

    constructor(img: string, name: string, price: number, types: string[]) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.types = types;
        this.id = FlowerModel.index;
        FlowerModel.index++;
    }
}
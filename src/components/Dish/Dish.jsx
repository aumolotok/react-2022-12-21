import {Button} from "../Button/Button";
import {useState} from "react";
import { Ingredient } from "../Ingredient/Ingredient";

export const Dish = ({dish}) => {
    const [count, setCount] = useState(0);

    if (!dish) {
        return null;
    }

    return <div>
        {dish.name}
        <ol>
            {dish.ingredients.map(ingredient => <li><Ingredient title={ingredient}/></li>)}
        </ol>
        <div>
            <Button onClick={() => setCount(count - 1)}>-</Button>
            {count}
            <Button onClick={() => setCount(count + 1)}>+</Button>
        </div>
    </div>
}
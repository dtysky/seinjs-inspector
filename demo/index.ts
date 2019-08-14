/**
 * @File   : index.tsx
 * @Author : 修雷 (lc199444@alibaba-inc.com)
 * @Date   : Tue Aug 06 2019
 * @Description: Component.
 */
import { main } from "./game";

const canvas = document.createElement("canvas");
canvas.className = "game";
document.getElementById("container").appendChild(canvas);

main(canvas);

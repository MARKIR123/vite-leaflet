import { Model } from "./Model";

export class exConfig {
    model: Model = Model.UpernetSwin;
    lr: number = 0.0001;
    batch_size: number = 4;
    epochs: number = 100;
}
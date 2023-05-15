export const exAreasObj = [
    {
        "id": 154,
        "name": "提取区域 1",
        "rectangle": {
            "_northEast": {
                "lng": 114.40763317757964,
                "lat": 30.646653144871006
            },
            "_southWest": {
                "lng": 114.40456058782883,
                "lat": 30.644547494309816
            }
        },
        "masks": [
            {
                "name": "Mask 1",
                "config": {
                    "model": "upernet-swin",
                    "lr": 0.0001,
                    "batch_size": 4,
                    "epochs": 100
                },
                "opacity": 0.4
            }
        ],
        "exconfig": {
            "model": "upernet-swin",
            "lr": 0.0001,
            "batch_size": 4,
            "epochs": 100
        }
    }
]
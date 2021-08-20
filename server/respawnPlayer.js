const respawnPlayer = (victim, body) => {
        // DEAD! come back to life and teleport to a new spot
        victim.isAlive = false

        body.client.smoothEntity.x = victim.x
        body.client.smoothEntity.x = victim.x
        setTimeout(() => {
            victim.isAlive = true
            victim.x = Math.random() * 500
            victim.y = Math.random() * 500
            // teleport the raw entity too
            victim.client.rawEntity.x = victim.x
            victim.client.rawEntity.y = victim.y
            victim.client.positions = []
        }, 1000)
}

export default respawnPlayer

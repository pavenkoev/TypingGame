class ZombieEnemy extends Enemy {
    createAnimator() {
        let animator = new Animator(ASSET_MANAGER.getAsset("./assets/Zombie_left.png"),
         0, 64, 32, 32, 8, 0.15);
        animator.scale = 3;
        return animator;
    }
}
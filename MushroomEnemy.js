class MushroomEnemy extends Enemy {
    createAnimator() {
        let animator = new Animator(ASSET_MANAGER.getAsset("./assets/Mushroom-Run.png"),
         0, 0, 150, 42, 8, 0.15);
        animator.scale = 2;
        animator.reverse = true;
        return animator;
    }
}
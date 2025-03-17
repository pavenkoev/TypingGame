class FlyingEyeEnemy extends Enemy {
    createAnimator() {
        let animator = new Animator(ASSET_MANAGER.getAsset("./assets/FlyingEye-Flight.png"),
         0, 0, 150, 38, 8, 0.15);
        animator.scale = 2;
        animator.reverse = true;
        return animator;
    }
}
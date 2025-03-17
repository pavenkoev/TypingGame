class SkeletonEnemy extends Enemy {
    createAnimator() {
        let animator = new Animator(ASSET_MANAGER.getAsset("./assets/Skeleton-Walk.png"),
         0, 0, 150, 56, 4, 0.15);
        animator.scale = 2;
        animator.reverse = true;
        return animator;
    }
}
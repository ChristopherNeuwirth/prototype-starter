import { ImageSkeletonModule } from './image-skeleton.module';

describe('ImageSkeletonModule', () => {
  let imageSkeletonModule: ImageSkeletonModule;

  beforeEach(() => {
    imageSkeletonModule = new ImageSkeletonModule();
  });

  it('should create an instance', () => {
    expect(imageSkeletonModule).toBeTruthy();
  });
});

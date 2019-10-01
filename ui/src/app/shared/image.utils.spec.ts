import { ImageUtils } from './image.utils';
import { MediaType } from './media-type';
// import { TestUtils } from './TestUtils';

describe('ImageUtils', () => {
  // TestUtils.mockAssetLoading();

  describe('generateAngularImageLoaderImage', () => {
    it('default sizes without placeholder and fallback', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImage('somepicture');

      expect(responsiveImage).toEqual({
        sizes: [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 660 },
          { size: 'md', width: 1200 },
          { size: 'lg', width: 1600 }
        ],
        image: {
          placeholder: undefined,
          fallback: undefined,
          images: [
            {
              size: 'xs',
              x1: 'somepicture',
              x2: 'somepicture'
            },
            {
              size: 'sm',
              x1: 'somepicture',
              x2: 'somepicture'
            },
            {
              size: 'md',
              x1: 'somepicture',
              x2: 'somepicture'
            },
            {
              size: 'lg',
              x1: 'somepicture',
              x2: 'somepicture'
            }
          ]
        }
      });
    });

    it('images with placeholder and fallback and custom sizes', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImage(
        'somepicture',
        'placeholderpicture',
        'fallbackpicture',
        [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 1000 },
          { size: 'md', width: 2000 },
          { size: 'lg', width: 3000 }
        ]
      );

      expect(responsiveImage).toEqual({
        sizes: [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 1000 },
          { size: 'md', width: 2000 },
          { size: 'lg', width: 3000 }
        ],
        image: {
          placeholder: 'placeholderpicture',
          fallback: 'fallbackpicture',
          images: [
            {
              size: 'xs',
              x1: 'somepicture',
              x2: 'somepicture'
            },
            {
              size: 'sm',
              x1: 'somepicture',
              x2: 'somepicture'
            },
            {
              size: 'md',
              x1: 'somepicture',
              x2: 'somepicture'
            },
            {
              size: 'lg',
              x1: 'somepicture',
              x2: 'somepicture'
            }
          ]
        }
      });
    });

    it('sould return empty images array if no imageUrl is given', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImage(null, 'placeholderpicture', 'fallbackpicture', [
        { size: 'xs', width: 0 },
        { size: 'sm', width: 1000 },
        { size: 'md', width: 2000 },
        { size: 'lg', width: 3000 }
      ]);

      expect(responsiveImage).toEqual({
        sizes: [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 1000 },
          { size: 'md', width: 2000 },
          { size: 'lg', width: 3000 }
        ],
        image: {
          placeholder: 'placeholderpicture',
          fallback: 'fallbackpicture',
          images: []
        }
      });
    });
  });

  describe('generateAngularImageLoaderImageForContentful', () => {
    it('default sizes without placeholder and fallback', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImageFromContentfulAsset(
        'somepicture',
        MediaType.IMAGE_JPEG
      );

      expect(responsiveImage).toEqual({
        sizes: [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 660 },
          { size: 'md', width: 1200 },
          { size: 'lg', width: 1600 }
        ],
        image: {
          placeholder: undefined,
          fallback: undefined,
          images: [
            {
              size: 'xs',
              x1: 'somepicture?w=660&q=80&fm=png',
              x2: 'somepicture?w=1320&q=80&fm=png'
            },
            {
              size: 'sm',
              x1: 'somepicture?w=660&q=80&fm=png',
              x2: 'somepicture?w=1320&q=80&fm=png'
            },
            {
              size: 'md',
              x1: 'somepicture?w=1200&q=80&fm=png',
              x2: 'somepicture?w=2400&q=80&fm=png'
            },
            {
              size: 'lg',
              x1: 'somepicture?w=1600&q=80&fm=png',
              x2: 'somepicture?w=3200&q=80&fm=png'
            }
          ]
        }
      });
    });

    it('images with placeholder and fallback and custom sizes', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImageFromContentfulAsset(
        'somepicture',
        MediaType.IMAGE_JPEG,
        'placeholderpicture',
        'fallbackpicture',
        null,
        [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 1000 },
          { size: 'md', width: 2000 },
          { size: 'lg', width: 3000 }
        ]
      );

      expect(responsiveImage).toEqual({
        sizes: [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 1000 },
          { size: 'md', width: 2000 },
          { size: 'lg', width: 3000 }
        ],
        image: {
          placeholder: 'placeholderpicture',
          fallback: 'fallbackpicture',
          images: [
            {
              size: 'xs',
              x1: 'somepicture?w=1000&q=80&fm=png',
              x2: 'somepicture?w=2000&q=80&fm=png'
            },
            {
              size: 'sm',
              x1: 'somepicture?w=1000&q=80&fm=png',
              x2: 'somepicture?w=2000&q=80&fm=png'
            },
            {
              size: 'md',
              x1: 'somepicture?w=2000&q=80&fm=png',
              x2: 'somepicture?w=4000&q=80&fm=png'
            },
            {
              size: 'lg',
              x1: 'somepicture?w=3000&q=80&fm=png',
              x2: 'somepicture?w=6000&q=80&fm=png'
            }
          ]
        }
      });
    });

    it('sould return empty images array if no imageUrl is given', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImageFromContentfulAsset(
        null,
        MediaType.IMAGE_JPEG,
        'placeholderpicture',
        'fallbackpicture',
        null,
        [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 1000 },
          { size: 'md', width: 2000 },
          { size: 'lg', width: 3000 }
        ]
      );

      expect(responsiveImage).toEqual({
        sizes: [
          { size: 'xs', width: 0 },
          { size: 'sm', width: 1000 },
          { size: 'md', width: 2000 },
          { size: 'lg', width: 3000 }
        ],
        image: {
          placeholder: 'placeholderpicture',
          fallback: 'fallbackpicture',
          images: []
        }
      });
    });

    it('should set quality query param by quality parameter if defined', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImageFromContentfulAsset(
        'somepicture',
        MediaType.IMAGE_JPEG,
        'placeholderpicture',
        'fallbackpicture',
        30,
        [{ size: 'xs', width: 0 }]
      );

      expect(responsiveImage).toEqual({
        sizes: [{ size: 'xs', width: 0 }],
        image: {
          placeholder: 'placeholderpicture',
          fallback: 'fallbackpicture',
          images: [
            {
              size: 'xs',
              x1: 'somepicture?w=0&q=30&fm=png',
              x2: 'somepicture?w=0&q=30&fm=png'
            }
          ]
        }
      });
    });

    it('should set quality query param by image type (jpeg)', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImageFromContentfulAsset(
        'somepicture',
        MediaType.IMAGE_JPEG,
        'placeholderpicture',
        'fallbackpicture',
        null,
        [{ size: 'xs', width: 0 }]
      );

      expect(responsiveImage).toEqual({
        sizes: [{ size: 'xs', width: 0 }],
        image: {
          placeholder: 'placeholderpicture',
          fallback: 'fallbackpicture',
          images: [
            {
              size: 'xs',
              x1: 'somepicture?w=0&q=80&fm=png',
              x2: 'somepicture?w=0&q=80&fm=png'
            }
          ]
        }
      });
    });

    it('should set quality query param by image type (png)', () => {
      const responsiveImage = ImageUtils.generateImageLoaderImageFromContentfulAsset(
        'somepicture',
        MediaType.IMAGE_PNG,
        'placeholderpicture',
        'fallbackpicture',
        null,
        [{ size: 'xs', width: 0 }]
      );

      expect(responsiveImage).toEqual({
        sizes: [{ size: 'xs', width: 0 }],
        image: {
          placeholder: 'placeholderpicture',
          fallback: 'fallbackpicture',
          images: [
            {
              size: 'xs',
              x1: 'somepicture?w=0&q=90&fm=png',
              x2: 'somepicture?w=0&q=90&fm=png'
            }
          ]
        }
      });
    });
  });

  describe('generateSrcset', () => {
    it('should return the right sourceSet with default sizes', () => {
      const url = 'MyImage';
      const result = ImageUtils.generateSrcset(url);

      expect(result).toBe('MyImage?w=660&fm=png 660w,' + 'MyImage?w=1200&fm=png 1200w,MyImage?w=1600&fm=png 1600w');
    });

    it('should return the right sourceSet with custom sizes', () => {
      const url = 'MyImage';
      const sizes = [200, 500, 1000];
      const result = ImageUtils.generateSrcset(url, sizes);

      expect(result).toBe('MyImage?w=200&fm=png 200w,' + 'MyImage?w=500&fm=png 500w,MyImage?w=1000&fm=png 1000w');
    });
  });

  describe('tryLoad', () => {
    const fallback = 'http://fallback.url';
    const asset = 'https://some-asset.url';

    // TestUtils.registerMockAsset(asset);

    it('should return image url if image could be loaded', (done) => {
      const subscribeCbSpy = jasmine.createSpy('tryLoad.subscribe');

      ImageUtils.tryLoad(asset, fallback).subscribe(
        subscribeCbSpy,
        () => {},
        () => {
          expect(subscribeCbSpy).toHaveBeenCalledTimes(1);
          expect(subscribeCbSpy.calls.argsFor(0)).toEqual([asset]);
          done();
        }
      );
    });

    it('should return fallback url as first value if initializeWithFallback is truthy', (done) => {
      const subscribeCbSpy = jasmine.createSpy('tryLoad.subscribe');

      ImageUtils.tryLoad(asset, fallback, true).subscribe(
        subscribeCbSpy,
        () => {},
        () => {
          expect(subscribeCbSpy).toHaveBeenCalledTimes(2);
          expect(subscribeCbSpy.calls.argsFor(0)).toEqual([fallback]);
          expect(subscribeCbSpy.calls.argsFor(1)).toEqual([asset]);
          done();
        }
      );
    });

    it('should return fallback url if image could not be loaded', (done) => {
      const subscribeCbSpy = jasmine.createSpy('tryLoad.subscribe');

      ImageUtils.tryLoad('', fallback).subscribe(
        subscribeCbSpy,
        () => {},
        () => {
          expect(subscribeCbSpy).toHaveBeenCalledTimes(1);
          expect(subscribeCbSpy.calls.argsFor(0)).toEqual([fallback]);
          done();
        }
      );
    });

    it('should return fallback url only once if initializeWithFallback is truthy and loading fails', (done) => {
      const subscribeCbSpy = jasmine.createSpy('tryLoad.subscribe');

      ImageUtils.tryLoad('', fallback, true).subscribe(
        subscribeCbSpy,
        () => {},
        () => {
          expect(subscribeCbSpy).toHaveBeenCalledTimes(1);
          expect(subscribeCbSpy.calls.argsFor(0)).toEqual([fallback]);
          done();
        }
      );
    });

    it('should not trigger image loading if the url is null or undefined and emit fallback', (done) => {
      const subscribeCbSpy = jasmine.createSpy('tryLoad.subscribe');

      ImageUtils.tryLoad(null, fallback, false).subscribe(
        subscribeCbSpy,
        () => {},
        () => {
          expect(subscribeCbSpy).toHaveBeenCalledTimes(1);
          expect(subscribeCbSpy.calls.argsFor(0)).toEqual([fallback]);
          done();
        }
      );

      ImageUtils.tryLoad(undefined, fallback, false).subscribe(
        subscribeCbSpy,
        () => {},
        () => {
          expect(subscribeCbSpy).toHaveBeenCalledTimes(2);
          expect(subscribeCbSpy.calls.argsFor(0)).toEqual([fallback]);
          done();
        }
      );
    });
  });

  it('should not trigger image loading if the url is null or undefined and emit fallback', (done) => {
    const subscribeCbSpy = jasmine.createSpy('tryLoad.subscribe');

    ImageUtils.tryLoad(null, null, false).subscribe(
      subscribeCbSpy,
      () => {},
      () => {
        expect(subscribeCbSpy).toHaveBeenCalledTimes(1);
        expect(subscribeCbSpy.calls.argsFor(0)).toEqual([null]);
        done();
      }
    );
  });
});

import RenderPostsHoc from '@components/Hoc/RenderPostsHoc';
import useMyPostsStore, {
  useMyPostStoreProps,
} from '../../../../store/useMyPosts';

const HoldPage = RenderPostsHoc(
  useMyPostsStore,
  useMyPostStoreProps.isFetchingPosts,
  useMyPostStoreProps.fetchMyPosts,
  useMyPostStoreProps.completedPosts,
  'COMPLETED'
);

export default HoldPage;

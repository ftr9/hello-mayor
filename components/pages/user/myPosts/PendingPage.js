import RenderPostsHoc from '@components/Hoc/RenderPostsHoc';
import useMyPostsStore, {
  useMyPostStoreProps,
} from '../../../../store/useMyPosts';

const PendingPage = RenderPostsHoc(
  useMyPostsStore,
  useMyPostStoreProps.isFetchingPosts,
  useMyPostStoreProps.fetchMyPosts,
  useMyPostStoreProps.pendingPosts,
  'PENDING'
);

export default PendingPage;

import RenderPostsHoc from '@components/Hoc/RenderPostsHoc';
import useMyPostsStore, {
  useMyPostStoreProps,
} from '../../../../store/useMyPosts';

const ProgressPage = RenderPostsHoc(
  useMyPostsStore,
  useMyPostStoreProps.isFetchingPosts,
  useMyPostStoreProps.fetchMyPosts,
  useMyPostStoreProps.progressPosts,
  'PROGRESS'
);

export default ProgressPage;

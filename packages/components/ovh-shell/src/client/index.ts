import ShellClient from './shell-client';
import IFrameMessageBus from '../message-bus/iframe';
import exposeApi from './api';

export function useShellApi() {
  const shell = new ShellClient(new IFrameMessageBus());
  return exposeApi(shell);
}

export default { useShellApi };
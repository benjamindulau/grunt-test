<?php

namespace Acme\GruntBundle\Composer;

use Symfony\Component\ClassLoader\ClassCollectionLoader;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\PhpExecutableFinder;
use Composer\Script\CommandEvent;

/**
 * @author Benjamin Dulau <benjamin.dulau@gmail.com>
 */
class ScriptHandler
{
    /**
     * @param $event CommandEvent A instance
     */
    public static function npmInstall(CommandEvent $event)
    {
        $options = self::getOptions($event);
        $appDir = $options['symfony-app-dir'];
        $symlink = $options['npm-symlinks'] ? '' : '--no-bin-links';

        static::executeCommand($event, 'npm install '.$symlink);
    }

    /**
     * @param $event CommandEvent A instance
     */
    public static function bowerInstall(CommandEvent $event)
    {
        $options = self::getOptions($event);
        $appDir = $options['symfony-app-dir'];

        static::executeCommand($event, 'bower install');
    }

    protected static function executeCommand(CommandEvent $event, $cmd, $timeout = 300)
    {
        $process = new Process($cmd, null, null, null, $timeout);
        $process->run(function ($type, $buffer) { echo $buffer; });
        if (!$process->isSuccessful()) {
            throw new \RuntimeException(sprintf('An error occurred when executing the "%s" command.', escapeshellarg($cmd)));
        }
    }

    protected static function getOptions(CommandEvent $event)
    {
        $options = array_merge(array(
            'symfony-app-dir' => 'app',
            'npm-symlinks' => true,
        ), $event->getComposer()->getPackage()->getExtra());

        $options['process-timeout'] = $event->getComposer()->getConfig()->get('process-timeout');

        return $options;
    }
}

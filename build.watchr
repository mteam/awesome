require 'date'

def run command
    puts "[#{Time.now.strftime("%R")}] #{command}"
    system command
    puts ""
end

def make what = nil
    command = ['make']
    command << what.to_s unless what.nil?

    command = command.join " "

    run command
end

watch('.*\.coffee') { |md| make }

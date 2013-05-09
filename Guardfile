# encoding: utf-8
# A sample Guardfile
# More info at https://github.com/guard/guard#readme

notification :terminal_notifier_guard

guard :shell, :all_on_start => true do
  watch(/^(test|lib)\/.+/) do
    status = `./node_modules/mocha/bin/mocha -R spec 2>&1`.force_encoding("utf-8")
    exit_code = $?

    if status =~ /failed/ || !exit_code.success?
      Notifier.notify("Failed", :title => "Some tests failed", :image => :failed)
    else
      Notifier.notify("Success", :title => "All green", :image => :success)
    end

    status
  end
end
